import React, { Component } from 'react'
import HeaderBar from "../HeaderBar/HeaderBar";
import { MenuStudyAI } from "../../Containers";
class LayoutMenuStudyAI extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (<>
            <div className="main-layout__header-bar">
                <HeaderBar />
            </div>
            <div className="main-layout__content">
                <MenuStudyAI openSearchWord={this.props.openSearchWord} onUploadVideo={this.props.onUploadVideo} openPanelHistory={this.props.openPanelHistory} handleClickMenu={this.props.handleClickMenu} handleSearch={this.props.handleSearch} />
            </div>
        </>


        );
    }
}

export default LayoutMenuStudyAI;