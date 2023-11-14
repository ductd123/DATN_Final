import React, { Component } from 'react'
import HeaderBar from "../HeaderBar/HeaderBar";
import { UploadVideoAI } from "../../Containers";
class HomepageMid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: false,
            active: false,
        }
    }

    render() {
        return (<>
            <div className="main-layout__header-bar">
                <HeaderBar />
            </div>
            <div className="main-layout__content">
                <UploadVideoAI/>
            </div>
        </>


        );
    }
}

export default HomepageMid;