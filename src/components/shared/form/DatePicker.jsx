import PropTypes from 'prop-types';
import DatePickerComponent from '../date-picker';
import moment from 'moment';

const CustomDatePicker = ({ setDate }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="relative w-full col-span-2">
        <DatePickerComponent
          id="start-date"
          mode="range"
           onChange={(dates) => {
            if (dates.length === 2) {
                const formatted = dates
                .map((date) => moment(date).format("YYYY-MM-DD"))
                .join(",");
                setDate(formatted);
            }
            if(dates.length === 0){
                setDate('');
            }
            }}
          placeholder="Pilih tanggal"
        />
      </div>
    </div>
  );
};

export default CustomDatePicker;

CustomDatePicker.propTypes = {
  setDate: PropTypes.func.isRequired,
};