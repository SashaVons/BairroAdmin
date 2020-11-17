import React, { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { Dispatch } from "redux";
import { useForm } from "react-hook-form";
import { FormInput } from "../../components/FormInput/FormInput";
import { RootState } from "../../redux/RootReducer";
import { useHistory } from "react-router-dom";
import "./edit-promocode.scss";
import {
  fetchSinglePromocode,
  fetchUpdatePromocode,
} from "../../redux/promocode/actions";
import { Promocode } from "../../common/types/Types";

type EditPromocode = {
  code: string;
  discount: number;
};

interface EditPromocodeProps {
  singlePromocode: any;
  fetchSinglePromocode: (promocodeId: string) => void;
  fetchUpdatePromocode: (
    updated_promocode: Promocode,
    promocodeId: string,
    history: any
  ) => void;
}

const EditPromocodeContainer: FC<EditPromocodeProps> = ({
  singlePromocode,
  fetchSinglePromocode,
  fetchUpdatePromocode,
}) => {
  let history = useHistory();
  const { register, handleSubmit, errors, setValue } = useForm();
  const match = useRouteMatch<any>();
  const { promocodeId } = match.params;
  const onSubmit = (data: EditPromocode) => {
    fetchUpdatePromocode(
      { code: data.code, discount: Number(data.discount) },
      promocodeId,
      history
    );
  };

  useEffect(() => {
    fetchSinglePromocode(promocodeId);
  }, []);

  useEffect(() => {
    if (singlePromocode) {
      setValue("code", singlePromocode.code);
      setValue("discount", singlePromocode.discount);
    }
  }, [singlePromocode]);

  return (
    <div className="Promocode-Edit">
      <div className="Promocode-Edit-Header">
        <p className="Promocode-Edit-Header-Title">Update Promocode</p>
        <div className="Promocode-Edit-Header-Button"></div>
      </div>
      <form className="Promocode-Edit-Form" onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          placeholder={"Code"}
          name={"code"}
          errors={errors}
          register={register}
          required={{ required: true }}
        />
        <FormInput
          placeholder={"Discount"}
          name={"discount"}
          errors={errors}
          register={register}
          required={{ required: true }}
        />
        <input
          type="submit"
          className="Promocode-Edit-Form-Button"
          value="Update"
        />
      </form>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    singlePromocode: state.promocode.singlePromocode,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchSinglePromocode: (promocodeId: string) =>
    dispatch(fetchSinglePromocode(promocodeId)),
  fetchUpdatePromocode: (
    updated_promocode: Promocode,
    promocodeId: string,
    history: any
  ) => dispatch(fetchUpdatePromocode(updated_promocode, promocodeId, history)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPromocodeContainer);
