import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addSkill, updateSkill } from "../../actions/skillAction";

const SkillModal = ({ id, header, skil, submitValue, colorButton }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.login.id);

  useEffect(() => {
    if (id === "editSkill") {
      setValue("type", skil.type);
      setValue("level", skil.level);
      setValue("userId", userId);
    }
  }, [skil, id, setValue, userId]);

  const onClick = (data) => {
    if (id === "editSkill") {
      dispatch(updateSkill(skil._id, data));
      reset();
    } else {
      data.userId = userId;
      dispatch(addSkill(data));
      reset();
    }
  };
  return (
    <div>
      <div
        className="modal fade"
        id={id}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog  modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {header}
              </h5>
              <button
                type="button"
                className="btn-close shadow-none"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div>
                <div className="row">
                  <div className="col-md-12 mb-md-0 mb-5 px-md-5">
                    <form>
                      <div className="row py-md-2">
                        <div className="col-md-12">
                          <div className="md-form mb-0">
                            <label htmlFor="title" className="">
                              Name
                            </label>
                            <input
                              type="text"
                              id="type"
                              name="type"
                              className="form-control shadow-none"
                              {...register("type", {
                                required: true
                              })}
                            />
                             {errors?.type && errors?.type?.type === "required" && (
                              <div className="text-danger ms-4">
                                You must enter your skill name
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="md-form mb-0">
                            <label htmlFor="level" className="">
                              Level
                            </label>
                            <input
                              type="text"
                              id="level"
                              name="level"
                              className="form-control shadow-none"
                              {...register("level", {
                                required: true
                              })}
                            />
                             {errors?.level && errors?.level?.type === "required" && (
                              <div className="text-danger ms-4">
                                You must enter your level
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary shadow-none"
x              >
                Close
              </button>
              <button
                type="button"
                className={`btn btn-${colorButton} shadow-none`}
                onClick={handleSubmit(onClick)}
              >
                {submitValue}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillModal;
