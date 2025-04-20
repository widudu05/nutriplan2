// Integração com Google Calendar API
// Este arquivo contém as funções necessárias para integrar o NutriSaaS com o Google Calendar

// Configuração da API do Google Calendar
const CLIENT_ID = '1234567890-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com'; // Substitua pelo seu CLIENT_ID real
const API_KEY = 'AIzaSyA1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q'; // Substitua pela sua API_KEY real
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/calendar";

let tokenClient;
let gapiInited = false;
let gisInited = false;

// Inicialização da API do Google
function initializeGoogleAPI() {
  const script1 = document.createElement('script');
  script1.src = 'https://apis.google.com/js/api.js';
  script1.onload = gapiLoaded;
  document.head.appendChild(script1);

  const script2 = document.createElement('script');
  script2.src = 'https://accounts.google.com/gsi/client';
  script2.onload = gisLoaded;
  document.head.appendChild(script2);
}

// Callback após o carregamento da API do Google
function gapiLoaded() {
  gapi.load('client', initializeGapiClient);
}

// Inicialização do cliente GAPI
async function initializeGapiClient() {
  await gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: DISCOVERY_DOCS,
  });
  gapiInited = true;
  maybeEnableButtons();
}

// Callback após o carregamento do cliente GIS
function gisLoaded() {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: '', // Será definido posteriormente
  });
  gisInited = true;
  maybeEnableButtons();
}

// Habilitar botões quando as APIs estiverem carregadas
function maybeEnableButtons() {
  if (gapiInited && gisInited) {
    document.getElementById('authorize_button').style.display = 'block';
  }
}

// Autenticação com o Google
function handleAuthClick() {
  tokenClient.callback = async (resp) => {
    if (resp.error !== undefined) {
      throw (resp);
    }
    document.getElementById('authorize_button').style.display = 'none';
    document.getElementById('signout_button').style.display = 'block';
    document.getElementById('calendar_container').style.display = 'block';
    await listUpcomingEvents();
  };

  if (gapi.client.getToken() === null) {
    tokenClient.requestAccessToken({ prompt: 'consent' });
  } else {
    tokenClient.requestAccessToken({ prompt: '' });
  }
}

// Desconectar do Google
function handleSignoutClick() {
  const token = gapi.client.getToken();
  if (token !== null) {
    google.accounts.oauth2.revoke(token.access_token);
    gapi.client.setToken('');
    document.getElementById('authorize_button').style.display = 'block';
    document.getElementById('signout_button').style.display = 'none';
    document.getElementById('calendar_container').style.display = 'none';
    document.getElementById('calendar_content').innerHTML = '';
  }
}

// Listar próximos eventos
async function listUpcomingEvents() {
  try {
    const response = await gapi.client.calendar.events.list({
      'calendarId': 'primary',
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 10,
      'orderBy': 'startTime'
    });

    const events = response.result.items;
    const calendarContent = document.getElementById('calendar_content');
    
    if (!events || events.length === 0) {
      calendarContent.innerHTML = '<p>Nenhuma consulta agendada.</p>';
      return;
    }

    let htmlContent = '<h3 class="text-lg font-medium text-gray-900 mb-4">Próximas Consultas</h3>';
    htmlContent += '<ul class="divide-y divide-gray-200">';
    
    events.forEach(event => {
      const when = event.start.dateTime ? new Date(event.start.dateTime) : new Date(event.start.date);
      const formattedDate = when.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
      const formattedTime = when.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
      
      htmlContent += `
        <li class="py-4">
          <div class="flex items-center space-x-4">
            <div class="flex-shrink-0">
              <div class="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <svg class="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 truncate">${event.summary}</p>
              <p class="text-sm text-gray-500">${formattedDate} às ${formattedTime}</p>
            </div>
            <div>
              <button onclick="editEvent('${event.id}')" class="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                Editar
              </button>
            </div>
          </div>
        </li>
      `;
    });
    
    htmlContent += '</ul>';
    calendarContent.innerHTML = htmlContent;
  } catch (err) {
    console.error('Erro ao listar eventos:', err);
    document.getElementById('calendar_content').innerHTML = '<p>Erro ao carregar eventos.</p>';
  }
}

// Criar novo evento no calendário
async function createCalendarEvent(summary, description, startDateTime, endDateTime) {
  try {
    const event = {
      'summary': summary,
      'description': description,
      'start': {
        'dateTime': startDateTime,
        'timeZone': 'America/Sao_Paulo'
      },
      'end': {
        'dateTime': endDateTime,
        'timeZone': 'America/Sao_Paulo'
      },
      'reminders': {
        'useDefault': false,
        'overrides': [
          {'method': 'email', 'minutes': 24 * 60},
          {'method': 'popup', 'minutes': 30}
        ]
      }
    };

    const request = gapi.client.calendar.events.insert({
      'calendarId': 'primary',
      'resource': event
    });

    const response = await request.execute();
    console.log('Evento criado: ' + response.htmlLink);
    
    // Atualizar a lista de eventos após criar um novo
    await listUpcomingEvents();
    
    return response;
  } catch (err) {
    console.error('Erro ao criar evento:', err);
    throw err;
  }
}

// Editar evento existente
async function editEvent(eventId) {
  try {
    // Primeiro, obter o evento atual
    const response = await gapi.client.calendar.events.get({
      'calendarId': 'primary',
      'eventId': eventId
    });
    
    const event = response.result;
    
    // Aqui você pode implementar um modal para edição
    // Por enquanto, vamos apenas mostrar os detalhes no console
    console.log('Evento para editar:', event);
    
    // Exemplo de como seria a atualização
    // Normalmente você obteria esses valores de um formulário
    const updatedEvent = {
      'summary': event.summary,
      'description': event.description,
      'start': event.start,
      'end': event.end,
      'reminders': event.reminders
    };
    
    const updateRequest = gapi.client.calendar.events.update({
      'calendarId': 'primary',
      'eventId': eventId,
      'resource': updatedEvent
    });
    
    await updateRequest.execute();
    console.log('Evento atualizado');
    
    // Atualizar a lista de eventos após editar
    await listUpcomingEvents();
  } catch (err) {
    console.error('Erro ao editar evento:', err);
  }
}

// Excluir evento
async function deleteEvent(eventId) {
  try {
    const request = gapi.client.calendar.events.delete({
      'calendarId': 'primary',
      'eventId': eventId
    });
    
    await request.execute();
    console.log('Evento excluído');
    
    // Atualizar a lista de eventos após excluir
    await listUpcomingEvents();
  } catch (err) {
    console.error('Erro ao excluir evento:', err);
  }
}

// Função para abrir o modal de agendamento
function openScheduleModal() {
  document.getElementById('schedule_modal').style.display = 'block';
}

// Função para fechar o modal de agendamento
function closeScheduleModal() {
  document.getElementById('schedule_modal').style.display = 'none';
}

// Função para processar o formulário de agendamento
async function handleScheduleForm(event) {
  event.preventDefault();
  
  const patientName = document.getElementById('patient_name').value;
  const appointmentDate = document.getElementById('appointment_date').value;
  const appointmentTime = document.getElementById('appointment_time').value;
  const appointmentDuration = parseInt(document.getElementById('appointment_duration').value);
  const appointmentNotes = document.getElementById('appointment_notes').value;
  
  // Criar data de início
  const startDateTime = new Date(`${appointmentDate}T${appointmentTime}`);
  
  // Criar data de término (adicionando a duração em minutos)
  const endDateTime = new Date(startDateTime.getTime() + appointmentDuration * 60000);
  
  // Formatar para ISO String
  const startISO = startDateTime.toISOString();
  const endISO = endDateTime.toISOString();
  
  try {
    await createCalendarEvent(
      `Consulta: ${patientName}`,
      appointmentNotes,
      startISO,
      endISO
    );
    
    // Fechar o modal e limpar o formulário
    closeScheduleModal();
    document.getElementById('schedule_form').reset();
    
    // Mostrar mensagem de sucesso
    alert('Consulta agendada com sucesso!');
  } catch (err) {
    alert('Erro ao agendar consulta. Por favor, tente novamente.');
  }
}

// Inicializar quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', function() {
  initializeGoogleAPI();
  
  // Adicionar event listeners
  document.getElementById('authorize_button').addEventListener('click', handleAuthClick);
  document.getElementById('signout_button').addEventListener('click', handleSignoutClick);
  document.getElementById('schedule_button').addEventListener('click', openScheduleModal);
  document.getElementById('close_modal').addEventListener('click', closeScheduleModal);
  document.getElementById('schedule_form').addEventListener('submit', handleScheduleForm);
});

// Exportar funções para uso global
window.handleAuthClick = handleAuthClick;
window.handleSignoutClick = handleSignoutClick;
window.listUpcomingEvents = listUpcomingEvents;
window.createCalendarEvent = createCalendarEvent;
window.editEvent = editEvent;
window.deleteEvent = deleteEvent;
window.openScheduleModal = openScheduleModal;
window.closeScheduleModal = closeScheduleModal;
