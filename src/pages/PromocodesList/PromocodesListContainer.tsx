import React, { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Link, useRouteMatch } from "react-router-dom";
import { RootState } from "../../redux/RootReducer";
import Icon from "@material-ui/core/Icon";

import "./promocodes-list.scss";
import { AcceptDialog } from "../../components/AcceptDialog/AcceptDialog";
import {
  fetchAllPromocodes,
  fetchDeletePromocode,
} from "../../redux/promocode/actions";

interface PromocodesListProps {
  promocodes: any;
  fetchAllPromocodes: () => void;
  fetchDeletePromocode: (promocodeId: string) => void;
}

const PromocodesListContainer: FC<PromocodesListProps> = ({
  promocodes,
  fetchAllPromocodes,
  fetchDeletePromocode,
}) => {
  const match = useRouteMatch();
  const [open, setOpen] = useState(false);
  const [categoryIndex, setCategoryIndex] = useState(0);

  useEffect(() => {
    fetchAllPromocodes();
  }, []);

  return (
    <>
      <AcceptDialog
        title="Do you want delete this promocode?"
        show={open}
        actionOnSuccess={() =>
          fetchDeletePromocode(promocodes[categoryIndex]._id)
        }
        setShow={setOpen}
      />
      <div className="Promocode">
        <div className="Promocode-Header">
          <div className="Promocode-Header-Button"></div>
          <p className="Promocode-Header-Title">Promocodes</p>
          <Link className="Promocode-Header-Button" to={`${match.url}/create`}>
            <Icon className="Promocode-Header-Button-Icon">
              add_circle_outline
            </Icon>
          </Link>
        </div>
        <table className="Promocode-Table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Discount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {promocodes
              ? promocodes.map((item: any, index: number) => (
                  <>
                    <tr>
                      <td className="Promocode-Table-Title" align="left">
                        {item.code}
                      </td>
                      <td className="Promocode-Table-Title" align="left">
                        {`-${item.discount} €`}
                      </td>
                      <td align="right">
                        {/* /edit/:categoryId */}
                        <Link to={`${match.url}/edit/${item._id}`}>
                          <Icon className="Promocode-Table-Edit">edit</Icon>
                        </Link>
                        <div
                          onClick={() => {
                            setCategoryIndex(index);
                            setOpen(true);
                          }}
                        >
                          <Icon className="Promocode-Table-Delete">delete</Icon>
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
    promocodes: state.promocode.promocodes,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchAllPromocodes: () => dispatch(fetchAllPromocodes()),
  fetchDeletePromocode: (promocodeId: string) =>
    dispatch(fetchDeletePromocode(promocodeId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PromocodesListContainer);
