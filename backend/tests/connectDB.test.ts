import mongoose from 'mongoose';
import connectDB from '../src/db'; // Replace with the actual path

// Mock mongoose.connect
jest.mock('mongoose', () => ({
  connect: jest.fn(),
}));

describe('connectDB', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should log "MongoDB connected" on successful connection', async () => {
    // Mock successful connection
    (mongoose.connect as jest.Mock).mockResolvedValueOnce(undefined);

    // Mock console.log
    const consoleLogMock = jest.spyOn(console, 'log').mockImplementation();

    await connectDB();

    expect(mongoose.connect).toHaveBeenCalledWith(expect.any(String), {});
    expect(consoleLogMock).toHaveBeenCalledWith('MongoDB connected');

    consoleLogMock.mockRestore(); // Restore console.log
  });

  it('should log an error and exit process on connection failure', async () => {
    // Mock connection failure
    const error = new Error('Connection failed');
    (mongoose.connect as jest.Mock).mockRejectedValueOnce(error);

    // Mock console.error
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();

    // Mock process.exit
    const processExitMock = jest.spyOn(process, 'exit').mockImplementation((code?: string | number | null | undefined): never => {
      if (typeof code === 'number') {
        throw new Error(`Process exited with code ${code}`);
      } else {
        throw new Error(`Process exited with non-numeric code`);
      }
    });

    await expect(connectDB()).rejects.toThrow('Process exited with code 1');

    expect(mongoose.connect).toHaveBeenCalledWith(expect.any(String), {});
    expect(consoleErrorMock).toHaveBeenCalledWith('MongoDB connection error:', error);

    consoleErrorMock.mockRestore(); // Restore console.error
    processExitMock.mockRestore(); // Restore process.exit
  });
});
