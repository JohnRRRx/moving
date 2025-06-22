import * as React from 'react';
import type {DetailsSize} from '../src/App';

interface ControlPanelProps {
  detailsSize: DetailsSize;
  onDetailSizeChange: (size: DetailsSize) => void;
}

function ControlPanel(props: ControlPanelProps) {
  return (
    <div className="controlPanel">
      <select
        name="detailsSize"
        id="detailsSize"
        value={props.detailsSize}
        onChange={event => {
          props.onDetailSizeChange(event.target.value as DetailsSize);
        }}>
        <option value="COMPACT">最小表示</option>
        <option value="FULL">詳細表示</option>
      </select>
    </div>
  );
}

export default React.memo(ControlPanel);
