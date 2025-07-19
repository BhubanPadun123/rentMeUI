import React,{Component} from "react";
import { connect } from "react-redux";

class ErrorBoundary extends Component{
    constructor(props) {
        super(props)
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, info) {
        console.error("ErrorBoundary caught an error:", error, info);
    }

    render() {
        if (this.state.hasError) {
            return <Text>Something went wrong: {this.state.error?.message}</Text>;
        }
        return this.props.children;
    }
}
const mapDispatchToProps=(state)=>{
    return{
        ...state
    }
}
export default connect(mapDispatchToProps)(ErrorBoundary)
