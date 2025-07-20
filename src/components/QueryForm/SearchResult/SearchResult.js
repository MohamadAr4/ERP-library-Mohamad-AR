import { useState, useEffect } from "react";
function SearchResult(props) {
  return (
    <div id="StoreQueryTable" class="col-12 overflow-x-auto">
      <table
        id="StoreQueryTableData"
        class="table table-bordered table-striped table-details"
      >
        <thead>
          {props.SearchQueryHeader.map((Header, HeaderIndex) => {
            return (
              <tr>
                {props.SearchQueryHeader &&
                  props.SearchQueryHeader[HeaderIndex].cells.map(
                    (cell, cellIndex) => {
                      return (
                        <td
                          style={{ width: "35px" }}
                          {...(cell.hasOwnProperty("attribute")
                            ? cell.attribute
                            : "")}
                        >
                          {cell.name}
                        </td>
                      );
                    }
                  )}
              </tr>
            );
          })}
        </thead>
        <tbody>
          {props.SearchQuery &&
            props.SearchQuery.map((row, outerIndex) => {
              return (
                <tr key={outerIndex}>
                  {row.cells.map((cell, cellIndex) => {
                    return (
                      <td key={cellIndex} style={{ width: "50px" }}>
                        {cell.value}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
export default SearchResult;
