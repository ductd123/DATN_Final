import React, { Component } from 'react'
import HeaderBar from "../HeaderBar/HeaderBar";
import { MenuStudyAI } from "../../Containers";
class LayoutMenuStudyAI extends Component {
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
                <MenuStudyAI onUploadVideo={this.props.onUploadVideo} openPanelHistory={this.props.openPanelHistory} />
            </div>
        </>


        );
    }
}

export default LayoutMenuStudyAI;