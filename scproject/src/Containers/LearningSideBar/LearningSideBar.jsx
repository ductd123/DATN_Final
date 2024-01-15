import React, { Component } from 'react'
import HeaderBar from "../../Component/HeaderBar/HeaderBar";
import { MenuStudyAI } from "..";
import logoHeader from '../../assets/image/LogoHeaderBar.png'
export default class LearningSideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (<>
            <div className="main-layout__header-bar">
                <HeaderBar disableSearch={true}/>
            </div>
            <div className="main-layout__content">
                <MenuStudyAI
                    openSearchWord={this.props.openSearchWord}
                    onUploadVideo={this.props.onUploadVideo}
                    openPanelHistory={this.props.openPanelHistory}
                    handleClickMenu={this.props.handleClickMenu}
                    handleSearch={this.props.handleSearch}
                    setValueOptions={this.props.setValueOptions}
                    listTopic={this.props.listTopic}
                    fetchData={this.props.fetchData}
                    setIdTopic={this.props.setIdTopic}
                    setSearchText={this.props.setSearchText}
                />
            </div>
        </>


        );
    }
}
