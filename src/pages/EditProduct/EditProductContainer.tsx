import React, { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { useForm } from "react-hook-form";
import { FormInput } from "../../components/FormInput/FormInput";
import { fetchCreatePhoto } from "../../redux/image/actions";
import { RootState } from "../../redux/RootReducer";
import "./edit-product.scss";
import {
  fetchAllCategories,
  fetchCreateCategory,
} from "../../redux/categories/actions";
import { useHistory, useRouteMatch } from "react-router-dom";
import { FormSelect } from "../../components/FormSelect/FormSelect";
import { fetchAllSubCategories } from "../../redux/sub_categories/actions";
import {
  fetchCreateProduct,
  fetchSingleProduct,
  fetchUpdateProduct,
} from "../../redux/products/actions";
import { Product } from "../../common/types/Types";
import { firestore } from "../../common/firebase";

type UpdateProduct = {
  title: string;
  title_pt: string;
  price: number;
  old_price: number;
  category: string;
  storage_count: string;
  storage_info: string;
  sub_categories: any;
  descriptions: string;
  descriptions_pt: string;
  life_conditions: string;
  life_conditions_pt: string;
  сomposition: string;
  сomposition_pt: string;
};

interface EditProductProps {
  fetchCreatePhoto: (image: any) => void;
  fetchAllCategories: () => void;
  fetchAllSubCategories: () => void;
  fetchSingleProduct: (productId: string) => void;
  fetchUpdateProduct: (
    updated_product: Product,
    productId: string,
    history: any
  ) => void;
  singleProduct: any;
  last_photo: string | undefined;
  categories: any;
  sub_categories: any;
  subCategoriesLoading: boolean;
  categoriesLoading: boolean;
}

const EditProductContainer: FC<EditProductProps> = ({
  fetchCreatePhoto,
  fetchSingleProduct,
  fetchAllSubCategories,
  fetchAllCategories,
  fetchUpdateProduct,
  last_photo,
  categories,
  sub_categories,
  subCategoriesLoading,
  categoriesLoading,
  singleProduct,
}) => {
  const match = useRouteMatch<any>();
  const { productId } = match.params;
  let history = useHistory();
  const [isPhotoLoad, setPhotoLoad] = useState(false);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [oldPrice, setOldPrice] = useState(0);
  const { register, handleSubmit, errors, setValue, control } = useForm();

  useEffect(() => {
    fetchSingleProduct(productId);
    fetchAllSubCategories();
    fetchAllCategories();
  }, []);

  useEffect(() => {
    if (!subCategoriesLoading && singleProduct) {
      setValue("sub_categories", singleProduct.sub_category._id);
    }
  }, [subCategoriesLoading, singleProduct]);

  useEffect(() => {
    if (singleProduct) {
      setValue("title", singleProduct.title);
      setValue("title_pt", singleProduct.title_pt);
      setValue("price", singleProduct.price.current);
      setValue("old_price", singleProduct.price.old);
      setPrice(singleProduct.price.current);
      setValue("discount", singleProduct.price.discount);
      setOldPrice(singleProduct.price.old);
      setValue("category", singleProduct.category._id);
      setCategory(singleProduct.category._id);
      setValue(
        "sub_categories",
        singleProduct.sub_category.map((el: any) => {
          return { value: el._id, label: el.name };
        })
      );
      setValue("descriptions", singleProduct.descriptions);
      setValue("descriptions_pt", singleProduct.descriptions_pt);
      setValue("life_conditions", singleProduct.life_conditions);
      setValue("life_conditions_pt", singleProduct.life_conditions_pt);
      setValue("сomposition", singleProduct.сomposition);
      setValue("сomposition_pt", singleProduct.сomposition_pt);
      setValue("storage_info", singleProduct.storage_info);
      setValue("storage_count", singleProduct.storage_count);
    }
  }, [singleProduct]);

  const handleImageAsFile = async (e: any) => {
    const image = e.target.files[0];
    console.log(image);
    await fetchCreatePhoto(image);
    setPhotoLoad(true);
  };
  const onSubmit = (data: UpdateProduct) => {
    fetchUpdateProduct(
      {
        title: data.title,
        title_pt: data.title_pt,
        price: {
          current: Number(data.price),
          old: data.old_price ? Number(data.old_price) : 0,
          discount: data.old_price
            ? Number(Math.floor(100 - price / (oldPrice / 100)))
            : 0,
        },
        descriptions: data.descriptions,
        descriptions_pt: data.descriptions_pt,
        images: [
          isPhotoLoad && last_photo ? last_photo : singleProduct.images[0],
        ],
        storage_count: data.storage_count,
        storage_info: data.storage_info,
        sub_category: data.sub_categories.map((el: any) =>
          firestore.doc(`sub_category/${el.value}`)
        ),
        // life_conditions: data.life_conditions,
        // life_conditions_pt: data.life_conditions_pt,
        // сomposition: data.сomposition,
        // сomposition_pt: data.сomposition_pt,
      },
      productId,
      history
    );
  };

  return (
    <div className="Product-Edit">
      <div className="Product-Edit-Header">
        <p className="Product-Edit-Header-Title">Edit Product</p>
        <div className="Product-Edit-Header-Button"></div>
      </div>
      {sub_categories && categories ? (
        <form className="Product-Edit-Form" onSubmit={handleSubmit(onSubmit)}>
          {isPhotoLoad ? (
            <img
              className="Product-Edit-Form-Selected-Image"
              src={last_photo}
            />
          ) : singleProduct ? (
            <img
              className="Product-Edit-Form-Selected-Image"
              src={singleProduct.images[0]}
            />
          ) : (
            <div className="Product-Edit-Form-Image-Empty">
              <p>Image not added</p>
            </div>
          )}
          <input
            type="file"
            accept="image/jpeg,image/png,image/jpg"
            className="Product-Edit-Form-Image"
            onChange={handleImageAsFile}
          />
          <FormInput
            placeholder={"Title"}
            name={"title"}
            type={"text"}
            errors={errors}
            register={register}
            required={{ required: true }}
          />
          <FormInput
            placeholder={"Portugal Title"}
            name={"title_pt"}
            type={"text"}
            errors={errors}
            register={register}
            required={{ required: true }}
          />
          <div className="Product-Edit-Form-Row">
            <FormInput
              customStyle={{ marginRight: "20px" }}
              placeholder={"Current Price"}
              name={"price"}
              type={"number"}
              errors={errors}
              register={register}
              onChange={(value: any) => setPrice(value)}
              required={{ required: true }}
            />
            <FormInput
              placeholder={"Old Price"}
              name={"old_price"}
              type={"number"}
              errors={errors}
              register={register}
              onChange={(value: any) => setOldPrice(value)}
              required={{}}
            />
          </div>
          <p className="Product-Edit-Form-Price">
            Finally discount:
            {oldPrice ? Number(Math.floor(100 - price / (oldPrice / 100))) : 0}
          </p>
          <FormInput
            placeholder={"Storage Count"}
            name={"storage_count"}
            type={"number"}
            errors={errors}
            register={register}
            required={{ required: true }}
          />
          <FormInput
            placeholder={"Storage Info"}
            name={"storage_info"}
            type={"text"}
            errors={errors}
            register={register}
            required={{ required: true }}
          />
          <FormSelect
            placeholder={"Sub Categories(Firstly select category)"}
            name={"sub_categories"}
            options={sub_categories.map((el: any) => {
              return { value: el._id, label: el.name };
            })}
            errors={errors}
            control={control}
            multi={true}
            required={{ required: true }}
          />
          <FormInput
            placeholder={"Descriptions"}
            name={"descriptions"}
            type={"text"}
            errors={errors}
            register={register}
            required={{ required: true }}
          />
          <FormInput
            placeholder={"Portugal Descriptions"}
            name={"descriptions_pt"}
            type={"text"}
            errors={errors}
            register={register}
            required={{ required: true }}
          />
          {/* <FormInput
            placeholder={"Life Conditions"}
            name={"life_conditions"}
            type={"text"}
            errors={errors}
            register={register}
            required={{ required: true }}
          />
          <FormInput
            placeholder={"Portugal Life Conditions"}
            name={"life_conditions_pt"}
            type={"text"}
            errors={errors}
            register={register}
            required={{ required: true }}
          /> */}
          {/* <FormInput
            placeholder={"Composition"}
            name={"сomposition"}
            type={"text"}
            errors={errors}
            register={register}
            required={{ required: true }}
          />
          <FormInput
            placeholder={"Portugal Composition"}
            name={"сomposition_pt"}
            type={"text"}
            errors={errors}
            register={register}
            required={{ required: true }}
          /> */}
          <input
            type="submit"
            className="Product-Edit-Form-Button"
            value="Update"
          />
        </form>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    last_photo: state.image.last_photo,
    categories: state.category.categories,
    singleProduct: state.product.singleProduct,
    sub_categories: state.sub_category.subCategories,
    subCategoriesLoading: state.sub_category.loading,
    categoriesLoading: state.category.loading,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchCreatePhoto: (image: any) => dispatch(fetchCreatePhoto(image)),
  fetchSingleProduct: (productId: string) =>
    dispatch(fetchSingleProduct(productId)),
  fetchAllCategories: () => dispatch(fetchAllCategories()),
  fetchAllSubCategories: () => dispatch(fetchAllSubCategories()),
  fetchUpdateProduct: (
    updated_product: Product,
    productId: string,
    history: any
  ) => dispatch(fetchUpdateProduct(updated_product, productId, history)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProductContainer);
