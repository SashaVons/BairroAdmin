import React, { FC } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

interface AcceptDialogProps {
  title: string;
  content?: string;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  actionOnSuccess: () => void;
}

export const AcceptDialog: FC<AcceptDialogProps> = ({
  title,
  content,
  show,
  setShow,
  actionOnSuccess,
}) => {
  return (
    <>
      <Dialog
        open={show}
        onClose={() => setShow(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>

        {content ? (
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {content}
            </DialogContentText>
          </DialogContent>
        ) : null}
        <DialogActions>
          <Button onClick={() => setShow(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              actionOnSuccess();
              setShow(false);
            }}
            color="primary"
            autoFocus
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
