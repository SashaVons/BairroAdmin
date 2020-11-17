import React, { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "../../redux/RootReducer";
import { Link, useRouteMatch } from "react-router-dom";
import {
  fetchAllSubCategories,
  fetchDeleteSubCategory,
} from "../../redux/sub_categories/actions";
import Icon from "@material-ui/core/Icon";
import { AcceptDialog } from "../../components/AcceptDialog/AcceptDialog";
import "./sub-category-list.scss";

interface SubCategoryListProps {
  fetchAllSubCategories: () => void;
  fetchDeleteSubCategory: (subCategoryId: string) => void;
  subCategories: any;
}

const SubCategoryListContainer: FC<SubCategoryListProps> = ({
  fetchAllSubCategories,
  fetchDeleteSubCategory,
  subCategories,
}) => {
  const match = useRouteMatch();
  const [open, setOpen] = useState(false);
  const [subCategoryIndex, setSubCategoryIndex] = useState(0);

  useEffect(() => {
    fetchAllSubCategories();
  }, []);
  return (
    <>
      <AcceptDialog
        title="Do you want delete this sub category?"
        show={open}
        actionOnSuccess={() =>
          fetchDeleteSubCategory(subCategories[subCategoryIndex]._id)
        }
        setShow={setOpen}
      />
      <div className="Sub-Category">
        <div className="Sub-Category-Header">
          <div className="Sub-Category-Header-Button"></div>
          <p className="Sub-Category-Header-Title">Sub Category</p>
          <Link
            className="Sub-Category-Header-Button"
            to={`${match.url}/create`}
          >
            <Icon className="Sub-Category-Header-Button-Icon">
              add_circle_outline
            </Icon>
          </Link>
        </div>
        <table className="Sub-Category-Table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {subCategories
              ? subCategories.map((item: any, index: number) => (
                  <>
                    <tr>
                      <td className="Sub-Category-Table-Title" align="left">
                        {item.name}
                      </td>
                      <td className="Sub-Category-Table-Title" align="left">
                        {item.category
                          ? item.category.name
                          : "Category not selected"}
                      </td>
                      <td align="right">
                        {/* /edit/:categoryId */}
                        <Link to={`${match.url}/edit/${item._id}`}>
                          <Icon className="Sub-Category-Table-Edit">edit</Icon>
                        </Link>
                        <div
                          onClick={() => {
                            setSubCategoryIndex(index);
                            setOpen(true);
                          }}
                        >
                          <Icon className="Sub-Category-Table-Delete">
                            delete
                          </Icon>
                        </div>
                      </td>
                    </tr>
                  </>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    subCategories: state.sub_category.subCategories,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchAllSubCategories: () => dispatch(fetchAllSubCategories()),
  fetchDeleteSubCategory: (subCategoryId: string) =>
    dispatch(fetchDeleteSubCategory(subCategoryId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubCategoryListContainer);
