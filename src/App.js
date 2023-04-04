import 'bootstrap/dist/css/bootstrap.min.css';
import AuthProvider, {useAuth} from "./cloud-infrastructure/auth";
import PageRoutes from "./PageRoutes";


function App() {

    return (
      <AuthProvider>
          <PageRoutes />
      </AuthProvider>
  );
}

export default App;
