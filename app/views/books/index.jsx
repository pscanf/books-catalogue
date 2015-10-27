import {isNil, partial, values} from "ramda";
import React, {Component, PropTypes} from "react";
import * as bootstrap from "react-bootstrap";
import {connect} from "react-redux";
import {pushState} from "redux-router";

import {fetchBooks, setBooksFilter, insertBook, updateBook} from "actions/books";
import BookForm from "components/book-form";
import FabButton from "components/fab-button";
import Griddle from "components/griddle";
import Icon from "components/icon";
import Spacer from "components/spacer";
import Spinner from "components/spinner";
import {fuzzyFilter} from "lib/utils";

function getSortComponent (direction) {
    return (
        <Icon
            className="pull-right"
            icon={`sort-${direction}`}
            mdi={true}
            style={{paddingTop: "3px"}}
        />
    );
}

function mapStateToProps ({books, booksFilter, fetchingBooks, router}) {
    return {books, booksFilter, fetchingBooks, router};
}

function mapDispatchToProps (dispatch) {
    return {
        fetchBooks () {
            dispatch(fetchBooks());
        },
        setBooksFilter (searchTerm) {
            dispatch(setBooksFilter(searchTerm));
        },
        insertBook (book) {
            dispatch(insertBook(book));
        },
        updateBook (book) {
            dispatch(updateBook(book));
        },
        goToBook (id) {
            dispatch(pushState(null, `/books/${id}`));
        },
        goToBooks () {
            dispatch(pushState(null, "/books/"));
        }
    };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Books extends Component {

    static propTypes = {
        books: PropTypes.object.isRequired,
        booksFilter: PropTypes.string.isRequired,
        fetchBooks: PropTypes.func.isRequired,
        fetchingBooks: PropTypes.bool.isRequired,
        goToBook: PropTypes.func.isRequired,
        goToBooks: PropTypes.func.isRequired,
        router: PropTypes.object.isRequired,
        setBooksFilter: PropTypes.func.isRequired
    }

    componentDidMount () {
        this.props.fetchBooks();
    }

    getBooks () {
        const {books, booksFilter} = this.props;
        return fuzzyFilter(values(books), booksFilter, ["title", "author"]);
    }

    renderAdd () {
        const {goToBook} = this.props;
        return (
            <FabButton
                bsSize="small"
                bsStyle="primary"
                icon="content-add"
                onClick={partial(goToBook, ["new"])}
                style={{
                    position: "absolute",
                    bottom: "15px",
                    right: "15px"
                }}
            />
        );
    }

    renderSearch () {
        const {booksFilter, setBooksFilter} = this.props;
        return (
            <bootstrap.Input
                addonAfter={<Icon icon="action-search" size="22px" />}
                onChange={({target: {value}}) => setBooksFilter(value)}
                placeholder="Search"
                type="text"
                value={booksFilter}
            />
        );
    }

    renderBooksList () {
        const {fetchingBooks, goToBook} = this.props;
        const columns = ["title", "author", "publicationYear", "id"];
        const columnsMetadata = [
            {columnName: "title", displayName: "Title"},
            {columnName: "author", displayName: "Author"},
            {columnName: "publicationYear", displayName: "Publication Year"},
            {
                columnName: "id",
                customComponent: ({data}) => (
                    <div
                        className="text-right"
                        onClick={partial(goToBook, [data])}
                        style={{cursor: "pointer"}}
                    >
                        <FabButton
                            bsSize="xsmall"
                            icon="content-create"
                        />
                        <Spacer direction="h" size={10} />
                    </div>
                ),
                displayName: ""
            }
        ];
        return !fetchingBooks ? (
            <Griddle
                columnMetadata={columnsMetadata}
                columns={columns}
                results={this.getBooks()}
                resultsPerPage={0}
                showPager={false}
                sortAscendingComponent={getSortComponent("ascending")}
                sortDescendingComponent={getSortComponent("descending")}
                tableClassName="table table-striped table-hover"
                useGriddleStyles={false}
            />
        ) : <Spinner />;
    }

    renderBookForm () {
        const {books, goToBooks, router} = this.props;
        const bookId = router.params.id;
        return (
            <BookForm
                formKey={bookId}
                initialValues={books[bookId]}
                inserting={bookId === "new"}
                onCancel={goToBooks}
                onSubmit={value => console.log(value)}
                show={!isNil(bookId)}
            />
        );
    }

    render () {
        return (
            <bootstrap.Grid fluid>
                <Spacer direction="v" size={30} />
                <bootstrap.Row>
                    <bootstrap.Col xs={6} xsOffset={6}>
                        {this.renderSearch()}
                    </bootstrap.Col>
                    <bootstrap.Col xs={12}>
                        {this.renderBooksList()}
                    </bootstrap.Col>
                </bootstrap.Row>
                {this.renderBookForm()}
                {this.renderAdd()}
            </bootstrap.Grid>
        );
    }

}
