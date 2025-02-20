interface SuccessAlertProps {
    successData: {
      serviceName: string;
      date: string;
      time: string;
    };
    onClose: () => void;
  }
  
  export const SuccessAlert: React.FC<SuccessAlertProps> = ({ successData, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-green-600 mb-4">Agendamento Confirmado!</h3>
          <div className="space-y-2 text-gray-700">
            <p>Serviço: <span className="font-semibold">{successData.serviceName}</span></p>
            <p>Data: <span className="font-semibold">{successData.date}</span></p>
            <p>Horário: <span className="font-semibold">{successData.time}</span></p>
          </div>
          <button 
            onClick={onClose}
            className="mt-6 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );