const TableComponent = ({ headers, data, renderRow, bgColor }) => (
    <div className="w-full mt-6">
      <div className="overflow-x-auto">
        <div className="rounded-xl border border-gray-200 shadow-md overflow-hidden">
          <table className="min-w-full table-auto divide-y divide-gray-200 text-sm sm:text-base">
            <thead className={`${bgColor} text-black`}>
              <tr>
                {headers.map((header, i) => (
                  <th key={i} className="px-4 py-3 text-left">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {data.map((item, index) => renderRow(item, index))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
export default TableComponent;