import React, {Component, PropTypes} from "react";
import {path} from "ramda";
import {connect} from "react-redux";
import {pushState, replaceState} from "redux-router";

import {fetch, upsert, remove} from "actions/collections";
import CollectionView from "components/collection-view";
import * as collectionsConfig from "lib/collections-config";

function mapStateToProps ({collections, router}) {
    return {
        collections,
        filter: path(["location", "query", "filter"], router),
        router
    };
}

function mapDispatchToProps (dispatch) {
    return {
        fetch (collection) {
            dispatch(fetch(collection));
        },
        upsert (collection, _id, element) {
            dispatch(upsert(collection, _id, element));
            dispatch(pushState(null, `/collection/${collection}/`));
        },
        remove (collection, _id) {
            dispatch(remove(collection, _id));
            dispatch(pushState(null, `/collection/${collection}/`));
        },
        setFilter (collection, filter) {
            dispatch(replaceState(null, `/collection/${collection}/`, {filter}));
        },
        goToElementUpdate (collection, _id) {
            dispatch(pushState(null, `/collection/${collection}/${_id}/update`));
        },
        goToElementInsert (collection) {
            dispatch(pushState(null, `/collection/${collection}/new`));
        },
        goToElementRemove (collection, _id) {
            dispatch(pushState(null, `/collection/${collection}/${_id}/remove`));
        },
        goToList (collection) {
            dispatch(pushState(null, `/collection/${collection}/`));
        }
    };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Collection extends Component {

    static propTypes = {
        collections: PropTypes.object.isRequired,
        fetch: PropTypes.func.isRequired,
        filter: PropTypes.string,
        goToElementInsert: PropTypes.func.isRequired,
        goToElementRemove: PropTypes.func.isRequired,
        goToElementUpdate: PropTypes.func.isRequired,
        goToList: PropTypes.func.isRequired,
        remove: PropTypes.func.isRequired,
        router: PropTypes.object.isRequired,
        setFilter: PropTypes.func.isRequired,
        upsert: PropTypes.func.isRequired
    }

    getCollection () {
        return path(["router", "params", "collection"], this.props);
    }

    getOptions () {
        return collectionsConfig[this.getCollection()];
    }

    renderNoCollectionMessage () {
        return (
            <div>
                {`Collection ${this.getCollection()} not found`}
            </div>
        );
    }

    render () {
        const options = this.getOptions();
        return options ? (
            <CollectionView {...this.props} {...options} />
        ) : this.renderNoCollectionMessage();
    }

}
