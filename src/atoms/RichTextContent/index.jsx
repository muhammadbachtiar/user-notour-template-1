import PropTypes from "prop-types"

const RichTextContent = ({ content, className = "" } ) => {
  return <div className={`prose prose-lg h-fit overflow-x-auto ${className}`} dangerouslySetInnerHTML={{ __html: content || "<p>Konten tidak tersedia</p>"}} />
}

export default RichTextContent

RichTextContent.propTypes = {
  content: PropTypes.string.isRequired,
  className: PropTypes.string,
};