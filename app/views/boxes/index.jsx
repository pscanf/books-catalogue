import Griddle from "griddle-react";
import {values} from "ramda";
import React, {Component, PropTypes} from "react";
import * as bootstrap from "react-bootstrap";
import {connect} from "react-redux";
import {pushState} from "redux-router";

import {fetchBoxes} from "actions/boxes";
import Icon from "components/icon";
import Spacer from "components/spacer";
import Spinner from "components/spinner";

const columns = ["name", "books"];
const columnsMetadata = [
    {
        columnName: "name",
        displayName: "Name"
    },
    {
        columnName: "books",
        displayName: "Books inside",
        customComponent: ({data}) => (
            <span>{data.length}</span>
        )
    }
];

function mapStateToProps ({boxes, fetchingBoxes}) {
    return {boxes, fetchingBoxes};
}

function mapDispatchToProps (dispatch) {
    return {
        fetchBoxes () {
            dispatch(fetchBoxes());
        },
        goToBox (id) {
            dispatch(pushState(null, `/boxes/${id}`));
        }
    };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Boxes extends Component {

    static propTypes = {
        boxes: PropTypes.object.isRequired,
        children: PropTypes.element,
        fetchBoxes: PropTypes.func.isRequired,
        fetchingBoxes: PropTypes.bool.isRequired,
        goToBox: PropTypes.func.isRequired
    }

    componentDidMount () {
        this.props.fetchBoxes();
    }

    handleRowClick (row) {
        this.props.goToBox(row.props.data.id);
    }

    renderBoxesList () {

        return (
            <Griddle
                columnMetadata={columnsMetadata}
                columns={columns}
                onRowClick={::this.handleRowClick}
                results={values(this.props.boxes)}
                resultsPerPage={0}
                showFilter={true}
                showPager={false}
                sortAscendingComponent={<Icon className="pull-right" icon="sort-alpha-asc"  />}
                sortDescendingComponent={<Icon className="pull-right" icon="sort-alpha-desc" />}
                tableClassName="table table-striped hover"
                useGriddleStyles={false}
            />
        );
    }

    render () {
        return (
            <bootstrap.Grid fluid>
                <Spacer direction="v" size={30} />
                <bootstrap.Row>
                    <bootstrap.Col xs={6}>
                        {
                            this.props.fetchingBoxes ?
                            <Spinner /> :
                            this.renderBoxesList()
                        }
                    </bootstrap.Col>
                    <bootstrap.Col xs={6}>
                        {this.props.children}
                    </bootstrap.Col>
                </bootstrap.Row>
            </bootstrap.Grid>
        );
    }

}
