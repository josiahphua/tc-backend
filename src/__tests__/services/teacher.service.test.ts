import TeacherService from "../../services/teacher.service";
import TeacherModel from "../../models/teacher.model";
import {
  Teacher,
  CreateTeacherDTO,
  Subject,
  TeacherResponse,
} from "../../types/teacher.types";

jest.mock("../../models/teacher.model");

const mockTeacherModel = TeacherModel as jest.Mocked<typeof TeacherModel>;

describe("TeacherService", () => {
  const mockTeacher: Teacher = {
    id: 1,
    name: "John Doe",
    email: "john.doe@email.com",
    subject: Subject.Mathematics,
    contactNumber: "1234567890",
    created_at: new Date(),
    updated_at: new Date(),
  };

  const mockCreateTeacherDTO: CreateTeacherDTO = {
    name: "John Doe",
    email: "john.doe@email.com",
    subject: Subject.Mathematics,
    contactNumber: "1234567890",
  };

  const mockTeachers = [mockTeacher];

  const mockSuccessResponse: TeacherResponse = {
    data: mockTeachers,
    success: true,
  };

  const errorMessage = "Database error";

  const mockFailureResponse: TeacherResponse = {
    success: false,
    error: errorMessage,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllTeachers", () => {
    it("should return all teachers", async () => {
      mockTeacherModel.getAll.mockResolvedValue(mockTeachers);

      const result = await TeacherService.getAllTeachers();

      expect(result).toEqual(mockSuccessResponse);
      expect(mockTeacherModel.getAll).toHaveBeenCalledTimes(1);
    });

    it("should handle errors", async () => {
      (mockTeacherModel.getAll as jest.Mock).mockRejectedValue(
        new Error(errorMessage),
      );

      const result = await TeacherService.getAllTeachers();

      expect(result).toEqual(mockFailureResponse);
    });
  });

  describe("registerTeacher", () => {
    it("should register a new teacher", async () => {
      mockTeacherModel.createTeacher.mockResolvedValue(mockSuccessResponse);

      const result = await TeacherService.registerTeacher(mockCreateTeacherDTO);

      expect(result).toEqual(mockSuccessResponse);
      expect(mockTeacherModel.createTeacher).toHaveBeenCalledWith(
        mockCreateTeacherDTO,
      );
    });

    it("should handle errors", async () => {
      (mockTeacherModel.createTeacher as jest.Mock).mockRejectedValue(
        new Error(errorMessage),
      );

      const result = await TeacherService.registerTeacher(mockCreateTeacherDTO);

      expect(result).toEqual(mockFailureResponse);
    });

    it("should handle unknown errors gracefully", async () => {
      const expectedResponse: TeacherResponse = {
        success: false,
        error: "An unknown error occurred",
      };
      mockTeacherModel.createTeacher.mockRejectedValue("Some non-Error value");

      const result = await TeacherService.registerTeacher(mockCreateTeacherDTO);

      expect(result).toEqual(expectedResponse);
    });
  });
});
