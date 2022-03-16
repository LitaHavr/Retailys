import React from "react";
import axios from "axios";
import {XMLParser, XMLBuilder} from "fast-xml-parser";
import "./App.css";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            data: null,
            names: [],
            categoryNames: []
        };
    }

    async componentDidMount() {
        axios
            .get("./export_full.xml", {
                "Content-Type": "application/xml; charset=utf-8",
            })
            .then((response) => {
                const parser = new XMLParser({
                    ignoreAttributes: false,
                    attributeNamePrefix: '',
                    attributesGroupName: '',
                    allowBooleanAttributes: true,
                });
                const jsonObj = parser.parse(response.data);

                const allItems = jsonObj.export_full.items.item
                const allCategory = jsonObj.export_full.categoriesWithParts.category
                const categoryNames = allCategory.map(item => item.name)
                const names = allItems.map(item => item.name)
                const parts = allItems.map(item => item.export)
                this.setState({data: jsonObj.export_full, isLoading: false, names: names, categoryNames: categoryNames})

            })
            .catch((error) => {
                this.setState({isLoading: false})
                console.log(error);
            });

    }

    render() {

        const listItem = this.state.names.map((name,i) =>
            <li key={i}>{name}</li>
        )
        const listItemCategories = this.state.categoryNames.map((name,i) =>
            <li key={i}>{name}</li>
        )

        return (
            <div className="App">
                <header className="App-header">
                    <div className='left'>
                        <h3>I could not complete step 3, but you have a list of all categories 	&#129303; &#9654;</h3>
                        <h2> All items:{this.state.isLoading ? 'Loading...' : this.state.data.items.item.length}</h2>
                        <ol>
                            {listItem}
                        </ol>
                    </div>

                    <div className='right'>
                    <h2>All categories : {this.state.isLoading ? 'Loading...' : this.state.categoryNames.length}</h2>
                    <ol>
                        {listItemCategories}
                    </ol>
                    </div>

                </header>
            </div>
        );
    }
}

export default App;