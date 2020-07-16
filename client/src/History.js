import React, {Component} from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css"
import axios from 'axios';
import {Button} from 'reactstrap';
import { Link } from "react-router-dom";
// page showing the user searching history table with delete button to choose to delete selected record from database
class History extends Component{
    constructor(props){
        super(props);

        this.state = {
            posts: []
        }
        this.loadColumn()

    }

    loadColumn(){
        axios.post('/searchHistory').then(res=>{
            this.setState({posts:res.data})
            console.log(res.data)
        })
    }
    
    deleteRecord(data){
        console.log(data)
        axios.get('/deletesearch?title='+data).then(res=>{
            console.log(res.data)
            this.loadColumn()
        })
    }
    
    render(){
        var data = this.state.posts.reverse();
        const columns = [
            {
                Header:"Search Keyword",
                accessor: "searchKeyword"
            },
            {
                Header:"Search Time",
                accessor: "time"
            },
            {
                Header:"Delete Record",
                Cell:  row =>{
                    return (
                        <div>
                        <button className="manage_button" 
                        onClick={()=>{
                            if (
                                window.confirm(
                                  "Are you sure you want to delete this search?"
                                )
                              ) {
                                this.deleteRecord(row.original._id)
                              }  
                            }}
                            >
                                Delete
                        </button>
                       
                        </div>
                    )
                }
            }
        ]
        
        return(
            <>
                <Link style={{"color":" #d6b3b3"}}to = {{pathname: `/home`}}>
                <button className="history_back_btn">
                    Back to Home
                </button>
                </Link>
            
                <center>
                    <h2> ~ APOD Search History ~</h2>
                    
                    <hr/>
                    <ReactTable
                        columns={columns}
                        data={this.state.posts}
                    >
                    </ReactTable>
                </center>
            </>
        );
    }
}

export default History;