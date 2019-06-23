import React, {Component} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import swal from 'sweetalert';


export default class UpdateMark extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeMark = this.onChangeMark.bind(this);
        this.state = {
            mark : '',
            submission : ''
        }
    }

    componentDidMount() {

        this.setState({
            mark : this.props.match.params.marks,
            submission : this.props.match.params.id
        })

    }

    onChangeMark(e){
        this.setState({
            mark : e.target.value
        })
    }
    onSubmit(e){

        e.preventDefault();

        axios.put("https://stormy-coast-77416.herokuapp.com/api/submission/update/"+this.state.submission+"/"+this.state.mark )
            .then(res=>{
                console.log(res.data);
                swal("Updated Successfully", "You updated marks successfully", "success")
                this.props.history.push("/instructorAddMarks");
            })
            .catch(err=>{
                console.log(err);
            })
    }

    render() {
        return (
            <div className="container">
                <form  onSubmit={this.onSubmit}>

                    <div className="col-md-8">
                        <label>Mark</label>
                        <input type="text" className="form-control"
                               value={this.state.mark}
                               onChange={this.onChangeMark}/>
                    </div>
                    <div className="col-md-6">
                        <button type="submit" className="btn btn-primary">Update Marks</button>
                    </div>

                </form>
            </div>
        );
    }
}