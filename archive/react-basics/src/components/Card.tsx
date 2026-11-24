type CardProps = {
  title: string;
  description? : string;
};

function Card({ title, description }: CardProps){
  return (
  <div>
      <h2>{title}</h2>
    { description && <p>{description}</p>}
 </div>
  )
};

export default Card;
