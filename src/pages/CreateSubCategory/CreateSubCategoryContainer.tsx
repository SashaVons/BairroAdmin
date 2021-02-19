import React, { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { useForm } from "react-hook-form";
import { FormInput } from "../../components/FormInput/FormInput";
import { fetchCreatePhoto } from "../../redux/image/actions";
import { RootState } from "../../redux/RootReducer";
import "./create-sub-category.scss";
import {
  fetchAllCategories,
  fetchCreateCategory,
} from "../../redux/categories/actions";
import { useHistory } from "react-router-dom";
import { FormSelect } from "../../components/FormSelect/FormSelect";
import { fetchCreateSubCategory } from "../../redux/sub_categories/actions";

type CreateCategory = {
  name: string;
  name_pt: string;
  category: any;
};

interface CreateSubCategoryProps {
  categories: any;
  fetchAllCategories: () => void;
  fetchCreateSubCategory: (
    name: string,
    name_pt: string,
    category: string,
    history: any
  ) => void;
}

const CreateSubCategoryContainer: FC<CreateSubCategoryProps> = ({
  fetchAllCategories,
  fetchCreateSubCategory,
  categories,
}) => {
  let history = useHistory();
  const [isPhotoLoad, setPhotoLoad] = useState(false);
  const { register, handleSubmit, errors, control } = useForm();

  const onSubmit = (data: CreateCategory) => {
    fetchCreateSubCategory(
      data.name,
      data.name_pt,
      data.category.value,
      history
    );
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

  return (
    <div className="Sub-Category-Create">
      <div className="Sub-Category-Create-Header">
        <p className="Sub-Category-Create-Header-Title">Creat Sub Category</p>
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
            type={"text"}
            errors={errors}
            register={register}
            required={{ required: true }}
          />
          <FormInput
            placeholder={"Portugal Name"}
            name={"name_pt"}
            type={"text"}
            errors={errors}
            register={register}
            required={{ required: true }}
          />
          <FormSelect
            placeholder={"Category"}
            name={"category"}
            options={categories.map((el: any) => {
              return { value: el._id, label: el.name };
            })}
            errors={errors}
            control={control}
            required={{ required: true }}
          />
          <input
            type="submit"
            className="Sub-Category-Create-Form-Button"
            value="Create"
          />
        </form>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    categories: state.category.categories,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchAllCategories: () => dispatch(fetchAllCategories()),
  fetchCreateSubCategory: (
    name: string,
    name_pt: string,
    category: string,
    history: any
  ) => dispatch(fetchCreateSubCategory(name, name_pt, category, history)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateSubCategoryContainer);
