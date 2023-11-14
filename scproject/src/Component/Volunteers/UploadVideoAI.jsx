import React, { Component } from 'react'

export default class UploadVideoAI extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: false,
        }
    }
    handleOpenSearch = () => {
        this.setState({ search: true })
    }
    handleCloseSearch = () => {
        this.setState({ search: false })
    }
    render() {
        return (
            <div className="">
            abc
            </div>
        )
    }
}