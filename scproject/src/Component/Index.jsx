import HomepageRight from "./Chatbox/HomepageRight";
import HomepageMid from "./ListFriend/HomepageMid";
import React, { Component } from 'react'

export default class Index extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <>
                <HomepageMid></HomepageMid>
                <HomepageRight></HomepageRight>
            </>
        );
    }
}