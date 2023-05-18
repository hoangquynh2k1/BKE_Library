import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    // Xử lý lỗi ở đây
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      // Hiển thị thông báo lỗi tùy chỉnh
      return <h1>Đã xảy ra lỗi.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
