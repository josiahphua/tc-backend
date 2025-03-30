import ClassService from "../../services/class.service";
import ClassModel from "../../models/class.model";
import {
  Class,
  CreateClassDTO,
  ClassResponse,
  ClassLevel,
} from "../../types/class.types";

jest.mock("../../models/class.model");

const mockClassModel = ClassModel as jest.Mocked<typeof ClassModel>;

describe("ClassService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockClasses: Class[] = [
    {
      id: 1,
      name: "Class A2",
      teacherEmail: "Teacher A",
      level: ClassLevel.Primary2,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 1,
      name: "Class A5",
      teacherEmail: "Teacher B",
      level: ClassLevel.Primary5,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  const mockSuccessResponse: ClassResponse = {
    success: true,
    data: mockClasses,
  };

  const mockFailureResponse: ClassResponse = {
    success: false,
    error: "Database error",
  };

  describe("getAllClasses", () => {
    it("should return all classes successfully", async () => {
      mockClassModel.getAll.mockResolvedValue(mockClasses);

      const response = await ClassService.getAllClasses();

      expect(response).toEqual(mockSuccessResponse);
      expect(mockClassModel.getAll).toHaveBeenCalledTimes(1);
    });

    it("should handle errors when getting all classes", async () => {
      const mockError = new Error("Database error");
      mockClassModel.getAll.mockRejectedValue(mockError);

      const response = await ClassService.getAllClasses();

      expect(response).toEqual(mockFailureResponse);
      expect(mockClassModel.getAll).toHaveBeenCalledTimes(1);
    });
  });

  describe("createClass", () => {
    it("should create a class successfully", async () => {
      const classFormData: CreateClassDTO = {
        name: "New Class",
        teacherEmail: "Teacher A",
        level: ClassLevel.Primary2,
      };

      const mockResponse: ClassResponse = {
        success: true,
        data: mockClasses,
      };

      mockClassModel.checkTeacherExists.mockResolvedValue(true);
      mockClassModel.CreateClass.mockResolvedValue(mockResponse);

      const response = await ClassService.createClass(classFormData);

      expect(response).toEqual(mockResponse);
      expect(mockClassModel.checkTeacherExists).toHaveBeenCalledWith(
        classFormData.teacherEmail,
      );
      expect(mockClassModel.CreateClass).toHaveBeenCalledWith(classFormData);
    });

    it("should return an error if the teacher does not exist", async () => {
      const classFormData: CreateClassDTO = {
        name: "New Class",
        teacherEmail: "Nonexistent Teacher",
        level: ClassLevel.Primary5,
      };

      mockClassModel.checkTeacherExists.mockResolvedValue(false);

      const response = await ClassService.createClass(classFormData);
      expect(response).toEqual({
        success: false,
        error: "Teacher does not exist",
      });
      expect(mockClassModel.checkTeacherExists).toHaveBeenCalledWith(
        classFormData.teacherEmail,
      );
      expect(mockClassModel.CreateClass).not.toHaveBeenCalled();
    });
  });
});
