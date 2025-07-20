import React, { useState, useEffect, forwardRef } from "react";
import Example from "../Modal/Modal";
import AttachModal from "../Modal/AttachModal";

const ToolBar = (props) => {
  useEffect(() => {
    if (props.shouldSearch) {
      props.handelPagerSearch(props.searchQueryIndex, 1);
      props.setShouldSearch(false);
      props.setIsDeleteAfterGetDone(true);
    }
  }, [props.shouldSearch, props.insertedId]);
  return (
    <div class="container-fluid">
      <div class="row">
        <div class="pagetitle">
          <div class="row">
            <div class="d-block d-sm-none col-12 d-flex align-items-center justify-content-center justify-content-sm-start">
              <h1>دليل المستودعات</h1>
            </div>
            <div class="col-12 col-sm-4 pt-1 pt-sm-0 d-flex align-items-center justify-content-center justify-content-sm-start">
              <button
                id="ph-submit"
                className={`btn btn-primary toolbar-btn ${
                  props.isSearchClicked || props.isGetDone ? "" : "d-none"
                }`}
                data-bs-title="حفظ"
                data-bs-toggle="popover"
                data-bs-placement="bottom"
                data-bs-trigger="hover focus"
                aria-label="حفظ"
                data-bs-original-title="حفظ"
                onClick={() => {
                  props.handelAddClick();
                }}
              >
                &nbsp;&nbsp;<i class="bi bi-clipboard-check"></i>&nbsp;&nbsp;
              </button>

              <div id="ph_divexecute">
                <button
                  id="ph-execute"
                  class={`btn btn-warning toolbar-btn ${
                    props.isSearchClicked || props.isGetDone ? "d-none" : ""
                  }`}
                  title="تنفيذ"
                  data-bs-title="تنفيذ"
                  data-bs-toggle="popover"
                  data-bs-placement="bottom"
                  data-bs-trigger="hover focus"
                  onClick={(e) => props.handelSearch(1, 10)}
                >
                  <i class="bi bi-lightning"></i>
                </button>
                <Example
                  isSearchClicked={props.isSearchClicked}
                  isGetDone={props.isGetDone}
                  vaFields={props.vaFields}
                  toggleFieldVisibility={props.toggleFieldVisibility}
                ></Example>
                <button
                  id="ph-toggle"
                  class={`btn btn-${
                    props.isToogleClicked ? "success" : "danger"
                  } toolbar-btn mx-1 ${
                    props.isProgressClicked &&
                    !props.isSearchClicked &&
                    !props.isGetDone
                      ? ""
                      : "d-none"
                  }`}
                  title="إخفاء/إظهار"
                  data-bs-title="إخفاء/إظهار"
                  data-bs-toggle="popover"
                  data-bs-placement="bottom"
                  data-bs-trigger="hover focus"
                  onClick={() => {
                    props.setIsToogleClicked((prevIsDone) => !prevIsDone);
                  }}
                >
                  <i id="ph-toggle-icon" class="bi bi-toggle-off"></i>
                </button>
              </div>

              {/* <div id="head-spinner" class="d-flex align-items-center px-5">
                  <div
                    class="spinner-border ms-auto"
                    role="status"
                    aria-hidden=""
                  ></div>
                </div> */}
            </div>
            <div class="col-12 col-sm-4 pt-1 pt-sm-0 d-flex align-items-center justify-content-center">
              <div
                id="pager"
                class={`input-group d-flex align-items-center justify-content-center ${
                  props.isGetDone ? "" : "d-none"
                } `}
              >
                <button
                  id="ph-fpager-first"
                  class="btn btn-primary toolbar-btn"
                  title="أول صفحة"
                  data-bs-title="أول صفحة"
                  data-bs-toggle="popover"
                  data-bs-placement="bottom"
                  data-bs-trigger="hover focus"
                  onClick={() => {
                    props.setSearchQueryIndex(1);
                    props.setShouldSearch(true);
                  }}
                >
                  <i class="bi bi-chevron-bar-right"></i>
                </button>
                <button
                  id="ph-fpager-previous"
                  class="btn btn-primary toolbar-btn"
                  title="الصفحة السابقة"
                  data-bs-title="الصفحة السابقة"
                  data-bs-toggle="popover"
                  data-bs-placement="bottom"
                  data-bs-trigger="hover focus"
                  onClick={() => {
                    if (props.searchQueryIndex > 1) {
                      props.setSearchQueryIndex(props.searchQueryIndex - 1);
                    }
                    props.setShouldSearch(true);
                  }}
                >
                  <i class="bi bi-chevron-right"></i>
                </button>
                <span
                  id="ph-fpager-current"
                  class="btn btn-primary toolbar-btn disabled"
                  title="الصفحة الحالية"
                  data-bs-title="الصفحة الحالية"
                  data-bs-toggle="popover"
                  data-bs-placement="bottom"
                  data-bs-trigger="hover focus"
                >
                  {props.searchQueryIndex}
                </span>
                <span
                  id="ph-fpager-all"
                  class="btn btn-primary toolbar-btn disabled"
                  title="العدد الكلي"
                  data-bs-title="العدد الكلي"
                  data-bs-toggle="popover"
                  data-bs-placement="bottom"
                  data-bs-trigger="hover focus"
                >
                  {props.count}
                </span>
                <button
                  id="ph-fpager-next"
                  class="btn btn-primary toolbar-btn"
                  title="الصفحة التالية"
                  data-bs-title="الصفحة التالية"
                  data-bs-toggle="popover"
                  data-bs-placement="bottom"
                  data-bs-trigger="hover focus"
                  onClick={() => {
                    if (props.searchQueryIndex < props.count) {
                      props.setSearchQueryIndex(props.searchQueryIndex + 1);
                    }
                    props.setShouldSearch(true);
                  }}
                >
                  <i class="bi bi-chevron-left"></i>
                </button>
                <button
                  id="ph-fpager-last"
                  class="btn btn-primary toolbar-btn"
                  title="الصفحة الأخيرة"
                  data-bs-title="الصفحة الأخيرة"
                  data-bs-toggle="popover"
                  data-bs-placement="bottom"
                  data-bs-trigger="hover focus"
                  onClick={() => {
                    props.setSearchQueryIndex(props.count);
                    props.setShouldSearch(true);
                  }}
                >
                  <i class="bi bi-chevron-bar-left"></i>
                </button>
              </div>
            </div>
            <div class="col-12 col-sm-4 pt-1 pt-sm-0 d-flex align-items-center justify-content-center justify-content-sm-end">
              <button
                id="ph-new"
                class={`btn btn-info toolbar-btn mx-1 ${
                  props.isQuery ? "d-none" : ""
                }`}
                title="جديد"
                data-bs-title="جديد"
                data-bs-toggle="popover"
                data-bs-placement="bottom"
                data-bs-trigger="hover focus"
                onClick={
                  !props.isSearchClicked
                    ? props.handleSearchClick
                    : props.onNewClick
                }
              >
                <i class="bi bi-plus-lg"></i>
              </button>

              <button
                id="ph-search"
                class={`btn btn-warning toolbar-btn mx-1 ${
                  props.isSearchClicked || props.isGetDone ? "" : "d-none"
                }`}
                title="بحث"
                data-bs-title="بحث"
                data-bs-toggle="popover"
                data-bs-placement="bottom"
                data-bs-trigger="hover focus"
                onClick={() => props.handleSearchClick()}
              >
                <i class="bi bi-search"></i>
              </button>

              <button
                id="ph-reset"
                class={`btn btn-danger toolbar-btn mx-1 ${
                  props.isSearchClicked || props.isGetDone ? "d-none" : ""
                }`}
                title="إفراغ البيانات"
                data-bs-title="إفراغ البيانات"
                data-bs-toggle="popover"
                data-bs-placement="bottom"
                data-bs-trigger="hover focus"
                onClick={() => props.onNewClick()}
              >
                <i class="bi bi-arrow-counterclockwise"></i>
              </button>

              <div
                id="ph_divdelete"
                class={`${props.isAddDone || props.isGetDone ? "" : "d-none"}`}
              >
                <button
                  id="ph-delete"
                  class={`btn btn-danger toolbar-btn mx-1`}
                  title="حذف"
                  data-bs-title="حذف"
                  data-bs-toggle="popover"
                  data-bs-placement="bottom"
                  data-bs-trigger="hover focus"
                  onClick={() => props.handelDeleteClick()}
                >
                  <i class="bi bi-trash"></i>
                </button>
              </div>

              <AttachModal
                isAddDone={props.isAddDone}
                isGetDone={props.isGetDone}
                insertedId={props.insertedId}
                aFields={props.aFields}
              ></AttachModal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ToolBar;
