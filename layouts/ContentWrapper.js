const ContentWrapper = ({ children, ...props }) => (
	<div className={`flex flex-col mb-20 space-y-20 ${props.className}`}>
		{children}
	</div>
)
export default ContentWrapper
