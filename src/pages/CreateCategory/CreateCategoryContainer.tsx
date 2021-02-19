import React, { FC, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { useForm } from "react-hook-form";
import { FormInput } from "../../components/FormInput/FormInput";
import { fetchCreatePhoto } from "../../redux/image/actions";
import { RootState } from "../../redux/RootReducer";
import "./create-category.scss";
import { fetchCreateCategory } from "../../redux/categories/actions";
import { useHistory } from "react-router-dom";

type CreateCategory = {
  name: string;
  name_pt: string;
};

interface CreateCategoryProps {
  fetchCreatePhoto: (image: any) => void;
  fetchCreateCategory: (
    name: string,
    name_pt: string,
    image: string,
    history: any
  ) => void;
  last_photo: string | undefined;
}

const CreateCategoryContainer: FC<CreateCategoryProps> = ({
  fetchCreatePhoto,
  fetchCreateCategory,
  last_photo,
}) => {
  let history = useHistory();
  const [isPhotoLoad, setPhotoLoad] = useState(false);
  const { register, handleSubmit, errors } = useForm();

  const handleImageAsFile = async (e: any) => {
    const image = e.target.files[0];
    console.log(image);
    await fetchCreatePhoto(image);
    setPhotoLoad(true);
  };
  const onSubmit = (data: CreateCategory) => {
    if (isPhotoLoad && last_photo)
      fetchCreateCategory(data.name, data.name_pt, last_photo, history);
  };

  return (
    <div className="Category-Create">
      <div className="Category-Create-Header">
        <p className="Category-Create-Header-Title">Creat Category</p>
        <div className="Category-Create-Header-Button"></div>
      </div>
      <form className="Category-Create-Form" onSubmit={handleSubmit(onSubmit)}>
        {isPhotoLoad ? (
          <img
            className="Category-Create-Form-Selected-Image"
            src={last_photo}
          />
        ) : (
          <div className="Category-Create-Form-Image-Empty">
            <p>Image not added</p>
          </div>
        )}
        <input
          type="file"
          accept="image/jpeg,image/png,image/jpg"
          className="Category-Create-Form-Image"
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
          placeholder={"Protugal Name"}
          name={"name_pt"}
          type={"text"}
          errors={errors}
          register={register}
          required={{ required: true }}
        />
        <input
          type="submit"
          className="Category-Create-Form-Button"
          value="Create"
        />
      </form>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    last_photo: state.image.last_photo,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchCreatePhoto: (image: any) => dispatch(fetchCreatePhoto(image)),
  fetchCreateCategory: (
    name: string,
    name_pt: string,
    image: string,
    history: any
  ) => dispatch(fetchCreateCategory(name, name_pt, image, history)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateCategoryContainer);
