class AppStatus {
    registerLayout(layout, rootPath) {
        this.layout = layout;
        this.rootPath = rootPath;
    }

    isSearching(search) {
        this.layout.setState({isSearching: search})
    }

    showLoginUI() {
        this.layout.setState({isLogin: true})
    }

    dismissLoginUI() {
        this.layout.setState({isLogin: false})
    }

    popoverRightMenu() {

    }

    dismissRightMenu() {
    }

    /**
     *
     * @param params
     */
    //pushNewParams(params) {
    //    this.postsHome.setState({postPostParams: params})
    //}
}

export default AppStatus;
