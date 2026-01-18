import ParticleField from './components/Background/ParticleField';
import DashboardLayout from './components/Layout/DashboardLayout';
import DigitalClock from './components/Widgets/Clock';
import WeatherWidget from './components/Widgets/Weather';
import SystemMonitor from './components/Widgets/SystemMonitor';
import QuickLinks from './components/Widgets/QuickLinks';
import NeuralNotes from './components/Widgets/NeuralNotes';
import ThemeSwitcher from './components/Widgets/ThemeSwitcher';
import OmniSearch from './components/Widgets/OmniSearch';
import NewsTicker from './components/Widgets/NewsTicker';
import AudioVisualizer from './components/Widgets/AudioVisualizer';
import CryptoTracker from './components/Widgets/CryptoTracker';
import PomodoroTimer from './components/Widgets/PomodoroTimer';
import VoiceCommander from './components/Widgets/VoiceCommander';
import { NexusProvider } from './context/NexusContext';
import './App.css';

function App() {
  return (
    <NexusProvider>
      <div className="nexus-container">
        <ParticleField />
        <ThemeSwitcher />
        <DashboardLayout>
          <OmniSearch />
          <DigitalClock />
          <WeatherWidget />
          <NeuralNotes />
          <SystemMonitor />
          <CryptoTracker />
          <PomodoroTimer />
          <VoiceCommander />
          <NewsTicker />
          <AudioVisualizer />
          <QuickLinks />
        </DashboardLayout>
      </div>
    </NexusProvider>
  );
}

export default App;
