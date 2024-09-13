import React from "react";
import NA_IMAGE from "../../assets/images/NA.jpg";
const ArticleCard = ({ article }) => {
  return (
    <div className="card bg-base-100 glass shadow-lg">
      <figure>
        <img
          src={article.image_url ? article.image_url : NA_IMAGE}
          alt={article.headline}
          className="w-full h-48 object-cover"
        />
      </figure>
      <div className="card-body">
        <h3 className="card-title">
          {article.headline.length > 50
            ? article.headline.slice(0, 50) + "..."
            : article.headline}
        </h3>

        <p className="text-sm text-gray-600">
          Published on: {new Date(article.publish_date).toLocaleDateString()}
        </p>
        <p className="mt-2">
          Source: <span className="font-semibold">{article.source}</span>
        </p>
        <a
          href={article.url}
          className="text-blue-600 mt-2 block"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read More
        </a>
      </div>
    </div>
  );
};
export default ArticleCard;
