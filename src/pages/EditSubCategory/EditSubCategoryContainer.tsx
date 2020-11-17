import React, { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { useForm } from "react-hook-form";
import { FormInput } from "../../components/FormInput/FormInput";
import { fetchCreatePhoto } from "../../redux/image/actions";
import { RootState } from "../../redux/RootReducer";
import "./edit-sub-category.scss";
import {
  fetchAllCategories,
  fetchCreateCategory,
} from "../../redux/categories/actions";
import { useRouteMatch } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { FormSelect } from "../../components/FormSelect/FormSelect";
import {
  fetchCreateSubCategory,
  fetchEditSubCategory,
  fetchSingleSubCategory,
} from "../../redux/sub_categories/actions";

type CreateCategory = {
  name: string;
  category: string;
};

interface CreateSubCategoryProps {
  fetchAllCategories: () => void;
  fetchSingleSubCategory: (subCategoryId: string) => void;
  fetchEditSubCategory: (
    subCategoryId: string,
    updated_sub_category: { name: string; category: string },
    history: any
  ) => void;
  singleSubCategory: any;
  categories: any;
}

const EditSubCategoryContainer: FC<CreateSubCategoryProps> = ({
  fetchAllCategories,
  fetchSingleSubCategory,
  fetchEditSubCategory,
  singleSubCategory,
  categories,
}) => {
  const match = useRouteMatch<any>();
  const { subCategoryId } = match.params;
  let history = useHistory();
  const [isPhotoLoad, setPhotoLoad] = useState(false);
  const { register, handleSubmit, errors, setValue } = useForm();

  const onSubmit = (data: CreateCategory) => {
    fetchEditSubCategory(subCategoryId, data, history);
  };

  useEffect(() => {
    if (singleSubCategory) {
      setValue("name", singleSubCategory.name);
      setValue("category", singleSubCategory.category._id);
    }
  }, [singleSubCategory]);

  useEffect(() => {
    fetchAllCategories();
    fetchSingleSubCategory(subCategoryId);
  }, []);

  return (
    <div className="Sub-Category-Create">
      <div className="Sub-Category-Create-Header">
        <p className="Sub-Category-Create-Header-Title">Edit Sub Category</p>
        <div className="Sub-Category-Create-Header-Button"></div>
      </div>
      {categories.length !== 0 ? (
        <form
          className="Sub-Category-Create-Form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormInput
            placeholder={"Name"}
            name={"name"}
            errors={errors}
            register={register}
            required={{ required: true }}
          />
          <FormSelect
            placeholder={"Category"}
            name={"category"}
            options={categories}
            errors={errors}
            register={register}
            required={{ required: true }}
          />
          <input
            type="submit"
            className="Sub-Category-Create-Form-Button"
            value="Update"
          />
        </form>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    singleSubCategory: state.sub_category.singleSubCategory,
    categories: state.category.categories,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchAllCategories: () => dispatch(fetchAllCategories()),
  fetchSingleSubCategory: (subCategoryId: string) =>
    dispatch(fetchSingleSubCategory(subCategoryId)),
  fetchEditSubCategory: (
    subCategoryId: string,
    updated_sub_category: { name: string; category: string },
    history: any
  ) =>
    dispatch(
      fetchEditSubCategory(subCategoryId, updated_sub_category, history)
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditSubCategoryContainer);