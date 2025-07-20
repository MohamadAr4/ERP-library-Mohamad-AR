import { useState ,useEffect } from "react";
function SearchResult(props) {
  const [req, setReq] = useState(10);
  const [page,SetPage] = useState(1);
  const [shouldSearch, setShouldSearch] = useState(false);
  useEffect(() => {
    if (shouldSearch) {
       props.handelPagerSearch(page,req);
       setShouldSearch(false);
    }
   }, [shouldSearch, req]);
  return (
    <div id="StoreQueryTable" class="col-12 overflow-x-auto">
      <table
        id="StoreQueryTableData"
        class="table table-bordered table-striped table-details"
      >
        <thead>
          <tr>
            <td style={{ width: "35px" }}></td>
            <td style={{ width: "35px" }}>#</td>
            {props.aFields.Fields.map(item => (
              item.type !== "hidden" ? <td style={{ width: "35px" }}>{item.label}</td> : null
            ))}
          </tr>
        </thead>
        <tbody>
          {props.SearchQuery && props.SearchQuery.map((item, index) => (
            <tr key={index}>
              <td style={{ width: "35px" }}>
                <a
                  href="javascript:;"
                  class="btn btn-primary toolbar-btn btn-sm edit-item"
                  data-id={item.id}
                  data-index={index}
                  onClick={()=>{
                    props.handelGet(item.id);
                    props.setSearchQueryIndex(index+1);
                    props.setInsertedId(item.id);
                    console.log(item.id);
                    props.setIsGetDone(true);
                  }}
                >
                  <i class="bi bi-pencil"></i>
                </a>
              </td>
              <td style={{ width: "35px" }}>{index + 1}</td>
              {props.aFields.Fields.map(field => (
                field.type!== 'hidden' ? field.Form.isAutocomplete || field.type === 'select' ? <td style={{ width: "35px" }}>{item[field.rField]}</td> : <td style={{ width: "35px" }}>{item[field.field]}</td> : null
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div id="StoreTablePager" class="row pt-2">
        <div class="col-12">
          <div
            id="table_pager"
            class="d-flex justify-content-end align-items-center flex-wrap"
          >
            <div class="d-flex flex-wrap py-2">
              <button
                id="table-pager-first"
                class="btn btn-icon btn-sm btn-light mr-2 my-1"
                data-bs-title="أول صفحة"
                data-bs-toggle="popover"
                data-bs-placement="bottom"
                data-bs-trigger="hover focus"
                aria-label="أول صفحة"
                data-bs-original-title="أول صفحة"
                onClick={() => {
                  SetPage(1);
                  setShouldSearch(true);
                }}
              >
                <i class="bi bi-chevron-bar-right"></i>
              </button>
              <button
                id="table-pager-previous"
                class="btn btn-icon btn-sm btn-light mr-2 my-1"
                data-bs-title="الصفحة السابقة"
                data-bs-toggle="popover"
                data-bs-placement="bottom"
                data-bs-trigger="hover focus"
                aria-label="الصفحة السابقة"
                data-bs-original-title="الصفحة السابقة"
                onClick={() => {
                  if (page > 1 ) {
                    SetPage(page-1);
                  }
                  setShouldSearch(true);
                }}
              >
                <i class="bi bi-chevron-right"></i>
              </button>
              <span
                id="table-pager-current"
                class="btn btn-icon btn-sm border-0 btn-light btn-hover-primary active px-3 mr-2 my-1"
                data-bs-title="الصفحة الحالية"
                data-bs-toggle="popover"
                data-bs-placement="bottom"
                data-bs-trigger="hover focus"
                data-bs-original-title="الصفحة الحالية"
              >
                {page}
              </span>
              <span
                id="table-pager-all"
                class="btn btn-icon btn-sm border-0 btn-light btn-hover-primary active mr-2 px-3 my-1"
                data-bs-title="العدد الكلي"
                data-bs-toggle="popover"
                data-bs-placement="bottom"
                data-bs-trigger="hover focus"
                data-bs-original-title="العدد الكلي"
              >
                {Math.ceil(props.count / req)}
              </span>
              <button
                id="table-pager-next"
                class="btn btn-icon btn-sm btn-light mr-2 my-1"
                data-bs-title="الصفحة التالية"
                data-bs-toggle="popover"
                data-bs-placement="bottom"
                data-bs-trigger="hover focus"
                aria-label="الصفحة التالية"
                data-bs-original-title="الصفحة التالية"
                onClick={(e) => {
                  if (page < Math.ceil(props.count / req)) {
                    SetPage(page + 1);
                  }
                  setShouldSearch(true);
                }}
              >
                <i class="bi bi-chevron-left"></i>
              </button>
              <button
                id="table-pager-last"
                class="btn btn-icon btn-sm btn-light mr-2 my-1"
                data-bs-title="الصفحة الأخيرة"
                data-bs-toggle="popover"
                data-bs-placement="bottom"
                data-bs-trigger="hover focus"
                aria-label="الصفحة الأخيرة"
                data-bs-original-title="الصفحة الأخيرة"
                onClick={() => {
                SetPage(Math.ceil(props.count / req));
                setShouldSearch(true);
              }}
              >
                <i class="bi bi-chevron-bar-left"></i>
              </button>
            </div>
            <div class="d-flex align-items-center px-2 py-3">
              <select
                id="table-pager-count"
                class="form-select form-select-sm my-1"
                style={{width: "75px"}}
                data-bs-title="Records Per Page"
                data-bs-toggle="popover"
                data-bs-placement="bottom"
                data-bs-trigger="hover focus"
                onChange={(e) => {
                  setReq(e.target.value); 
                  SetPage(1);  
                  setShouldSearch(true);
                }}
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="75">75</option>
                <option value="100">100</option>
              </select>
              <span id="table-pager-dep" class="text-muted px-1">
                {props.count}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SearchResult;
