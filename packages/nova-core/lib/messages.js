import React, {PropTypes, Component} from 'react';
import PostDetailSet from "./postdetailset.js";
import AppStatus from "./appstatus.js";
import PopoverMenus from "./popovermenus.js"
import UserCollections from "./usercollections"
import PostDetailImage from "./postdetailimage"

const Messages = {
    // Local (client-only) collection
    collection: new Meteor.Collection(null),

    flash(content, type) {
        type = (typeof type === 'undefined') ? 'error' : type;
        // Store errors in the local collection
        this.collection.insert({content: content, type: type, seen: false, show: true});
    },

    appStatus: new AppStatus(),
    userCollections: new UserCollections(),
    postDetailSet: new PostDetailSet(),
    postDetailImage: new PostDetailImage(),

    layout: Component,
    newsListContainer: null,
    needResetListLimit: true,

    registerNewsListContainer(comp){
        this.newsListContainer = comp;
    },

    resetNewsListContainer(increment){
        if (this.newsListContainer) {
            this.newsListContainer.setState({limit: increment});
        }
    },

    registerCompont(layout, rootPath){
        this.layout = layout;
        this.appStatus.registerLayout(layout, rootPath);
        this.userCollections.registerLayout(layout);
    },

    registerUserCollectionsPopover(comp){
        this.userCollections.registerCompForUserCollectionsPopover(comp);
    },

    showPopoverMenu(top, left, width, height, type, object){
        var popoverMenus = new PopoverMenus(top, left, width, height, type, object);
        if (this.layout.state.popoverMenu) {
            this.dismissPopoverMenu();
        } else {
            this.layout.setState({popoverMenu: popoverMenus});
        }
    },

    dismissPopoverMenu(){
        if (this.layout.state.popoverMenu) {
            this.layout.setState({popoverMenu: null});
        }
    },

    markAsSeen(messageId) {
        this.collection.update(messageId, {$set: {seen: true}});
    },

    clear(messageId) {
        this.collection.update(messageId, {$set: {show: false}});
    },

    clearSeen() {
        this.collection.update({seen: true}, {$set: {show: false}}, {multi: true});
        this.postDetailImage.clearPostId();
        if (this.needResetListLimit) {
            this.resetNewsListContainer(10)
        }
        this.needResetListLimit = true;
    },

    /**
     * A: Category pages don’t have day wise groups
     *    Remove calendar from Category pages or give category pages day wise gro
     *    On category page. If i use the calendar option it takes me back to the homepage
     *    Either the calendar option should be removed from the category page or day wise groups made on category pages also
     *    you want to add this url :http://scruby.site/?after=2016-09-26&before=2016-09-26&cat=politics?
     * B: filter posts by categories and date?
     * A: Yes,So day wise groups for category and tag pages.
     *
     * Note: So day wise groups for category and tag pages.
     *       Make day wise groups on category pages, remove calendar widget from tag and source pages.
     *       So calendar will only show on “Homepage” and “Category” page
     *       Homepage and category pages will have day wise groups
     *
     * @param router
     * @param obj
     */
    pushNewLocationPath(router, obj){
        const query = _.clone(router.location.query);
        router.push(obj);

        $('html, body').animate({
            scrollTop: $("#web-app-panel").offset().top
        }, 2);
    },

    pushNewLocationPathWithTitle(router, obj, title){
        obj.query['title'] = title;
        this.adjustNewQuery(router, obj.query);
        this.pushNewLocationPath(router, obj);
    },

    pushRouterForDetailPage(router, obj){
        this.pushNewLocationPath(router, obj);
        this.needResetListLimit = false;
    },

    adjustNewQuery(router, newQuery){
        const query = _.clone(router.location.query);
        if (query.before && query.after) {
            newQuery["before"] = query.before;
            newQuery["after"] = query.after;
        }
    }

};

export default Messages;
