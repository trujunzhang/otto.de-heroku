class PostDetailImage {
    constructor() {
        this.lastPostId = "";
        this.isNewPost = false;
        this.removeDataLargeImage = false;
        this.updateDetailedPostImage = false;
    }

    clearPostId() {
        this.lastPostId = "";
    }

    resetDetailedPostImage(postId) {
        if (this.lastPostId == postId) {
            return;
        }
        this.lastPostId = postId;

        this.isNewPost = true;
        this.updateDetailedPostImage = true;
    }

    didLoadDetailedPostImage() {
        this.isNewPost = false;
        this.updateDetailedPostImage = false;
        this.removeDataLargeImage = true;
    }

    shouldUpdateDetailedPostImage() {
        return this.updateDetailedPostImage && this.isNewPost;
    }

    shouldRemoveDataLargeImage() {
        return this.removeDataLargeImage && this.isNewPost;
    }

    didRemoveDataLargeImage() {
        this.removeDataLargeImage = false;
    }
}

export default PostDetailImage;
