import ClassService from "../../services/class.service";
import ClassModel from "../../models/class.model";
import {
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

  const mockClassResponse: ClassResponse = {
    data: [
      {
        id: 1,
        name: "Class A2",
        teacherEmail: "Teacher A",
        level: ClassLevel.Primary2,
        created_at: new Date(),
        updated_at: new Date(),
        teacher: {
          name: "Teacher A",
        },
      },
    ],
    success: true,
  };

  const mockFailureResponse: ClassResponse = {
    success: false,
    error: "Database error",
  };

  describe("getAllClasses", () => {
    it("should return all classes successfully", async () => {
      mockClassModel.getAll.mockResolvedValue(mockClassResponse);

      const response = await ClassService.getAllClasses();

      expect(response).toEqual(mockClassResponse);
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

      mockClassModel.checkTeacherExists.mockResolvedValue(true);
      mockClassModel.CreateClass.mockResolvedValue(mockClassResponse);

      const response = await ClassService.createClass(classFormData);

      expect(response).toEqual(mockClassResponse);
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
        error: "Teacher with email Nonexistent Teacher not found",
      });
      expect(mockClassModel.checkTeacherExists).toHaveBeenCalledWith(
        classFormData.teacherEmail,
      );
      expect(mockClassModel.CreateClass).not.toHaveBeenCalled();
    });
  });
});
