class PostDetailSet {
    constructor() {
        this.stack = [];
    }

    push(postObject) {
        this.stack.push(postObject);
    }

    empty() {
        this.stack = [];
    }

    lastPage() {
        if (this.stack.length == 0)
            return null;

        this.stack.pop();
        var lastPost = this.stack[this.stack.length - 1];
        return lastPost;
    }

    fetchPostPage(postId) {
        return postId
    }
}

export default PostDetailSet;
