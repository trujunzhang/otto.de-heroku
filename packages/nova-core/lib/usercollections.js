class UserCollections {
    registerLayout(layout) {
        this.layout = layout;
        this.postId = "";
    }

    registerCompForUserCollectionsPopover(comp) {
        this.userCollectionsPopover = comp;
        this.userCollectionsPopover.state = this.initialState = {
            addNewItem: false,
            newFolder: null,
            showResult: false,
            value: '',
            step: 1
        };
    }

    resetState(post) {
        this.savedPost = post;
        if (this.userCollectionsPopover) {
            this.userCollectionsPopover.setState({
                addNewItem: false,
                newFolder: null,
                showResult: false,
                value: '',
                step: 1
            });
        }
    }

    setState(state) {
        this.userCollectionsPopover.setState(state);
    }

}

export default UserCollections;
