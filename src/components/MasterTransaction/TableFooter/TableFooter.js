function TableFooter(props) {
  return (
    <div class="ph-table-footer" style={{ width: "2115px", display: "flex" }}>
      <div style={{ width: "31px" }}>&nbsp;</div>
      <div
        id="foot-phTable-PhTable-0"
        style={{ width: "35px" }}
        class="ph-table-col float-left border border-1 p-1"
      >
        {props.rowLength}
      </div>
      {props.meta.Column.map((col, colIndex) => {
        if (col.type !== "hidden") {
          return (
            <div
              id={`${col.id}`}
              style={{ width: `${col.width}` }}
              class={`${col.labelClass}`}
            >
              {props.meta.Column[colIndex].footerValue}
            </div>
          );
        }
      })}
    </div>
  );
}
export default TableFooter;
