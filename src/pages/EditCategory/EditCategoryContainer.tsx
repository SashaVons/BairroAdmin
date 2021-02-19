import React, { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { Dispatch } from "redux";
import { useForm } from "react-hook-form";
import { FormInput } from "../../components/FormInput/FormInput";
import {
  fetchSingleCategory,
  fetchUpdateCategory,
} from "../../redux/categories/actions";
import { RootState } from "../../redux/RootReducer";
import { useHistory } from "react-router-dom";
import { fetchCreatePhoto } from "../../redux/image/actions";
import "./edit-category.scss";

type EditCategory = {
  name: string;
  name_pt: string;
};

interface EditCategoryProps {
  singleCategory: any;
  fetchCreatePhoto: (image: any) => void;
  fetchSingleCategory: (categoryId: string) => void;
  fetchUpdateCategory: (
    categoryId: string,
    updated_category: { name: string; name_pt: string; image: string },
    history: any
  ) => void;
  last_photo: string | undefined;
}

const EditCategoryContainer: FC<EditCategoryProps> = ({
  singleCategory,
  last_photo,
  fetchSingleCategory,
  fetchUpdateCategory,
  fetchCreatePhoto,
}) => {
  let history = useHistory();
  const [isPhotoLoad, setPhotoLoad] = useState(false);
  const { register, handleSubmit, errors, setValue } = useForm();
  const match = useRouteMatch<any>();
  const { categoryId } = match.params;
  const onSubmit = (data: EditCategory) => {
    fetchUpdateCategory(
      categoryId,
      {
        name: data.name,
        name_pt: data.name_pt,
        image: isPhotoLoad && last_photo ? last_photo : singleCategory.image,
      },
      history
    );
  };

  const handleImageAsFile = async (e: any) => {
    const image = e.target.files[0];
    console.log(image);
    await fetchCreatePhoto(image);
    setPhotoLoad(true);
  };

  useEffect(() => {
    fetchSingleCategory(categoryId);
  }, []);

  useEffect(() => {
    if (singleCategory) {
      setValue("name", singleCategory.name);
      setValue("name_pt", singleCategory.name_pt);
    }
  }, [singleCategory]);

  return (
    <div className="Category-Edit">
      <div className="Category-Edit-Header">
        <p className="Category-Edit-Header-Title">Update Category</p>
        <div className="Category-Edit-Header-Button"></div>
      </div>
      <form className="Category-Edit-Form" onSubmit={handleSubmit(onSubmit)}>
        {isPhotoLoad ? (
          <img className="Category-Edit-Form-Selected-Image" src={last_photo} />
        ) : singleCategory ? (
          <img
            className="Category-Edit-Form-Selected-Image"
            src={singleCategory.image}
          />
        ) : (
          <div className="Category-Edit-Form-Image-Empty">
            <p>Image not added</p>
          </div>
        )}
        <input
          type="file"
          accept="image/jpeg,image/png,image/jpg"
          className="Category-Edit-Form-Image"
          onChange={handleImageAsFile}
        />
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
        <input
          type="submit"
          className="Category-Edit-Form-Button"
          value="Update"
        />
      </form>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    singleCategory: state.category.singleCategory,
    last_photo: state.image.last_photo,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchUpdateCategory: (
    categoryId: string,
    updated_category: { name: string; image: string },
    history: any
  ) => dispatch(fetchUpdateCategory(categoryId, updated_category, history)),
  fetchSingleCategory: (categoryId: string) =>
    dispatch(fetchSingleCategory(categoryId)),
  fetchCreatePhoto: (image: any) => dispatch(fetchCreatePhoto(image)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCategoryContainer);
