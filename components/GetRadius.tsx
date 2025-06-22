type Props = {
  value: number;
  onChange: (newValue: number) => void;
};

function GetRadius( props : Props) {  //1行目で定義したtypeをここで適用させる、中身の順番も同じ
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(event.target.value);  // rangeバーの値を取得(String)
    props.onChange(value);  // 親コンポのsetRadius関数に値に渡す（setRadiusの値を更新）
  }

  return (
    <div className="changeRadius">
      <input
        type="range"
        min={0}
        max={10000}
        step={100}
        value={props.value}
        onChange={handleChange}
      />
      <span>
        {props.value < 1000 ? `${props.value}m` : `${(props.value / 1000).toFixed(1)}km`}圏内
      </span>
    </div>
  );
}

export default GetRadius;
