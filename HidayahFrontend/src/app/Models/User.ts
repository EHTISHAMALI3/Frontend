export class User {
    userId!: string;
    userTypeId!: number;
    roleId!: number;
    passwordHash!: string;
    userName?: string;
    firstName!: string;
    lastName!: string;
    email!: string;
    phoneNumber!: string;
    institutionId!: string;
    branchId!: string;
    cityId!: string;
    state?: string;
    countryId!: string;
    address?: string;
    designation?: string;
    image?: string;
    grade?: string;
    joiningDate!: Date;
    refreshTokenExpiryTime?: Date;
    isLocked: boolean = false;
    failedLoginAttempts: number = 0;
    lockoutEndTime?: Date;
    createdAt: Date = new Date();
    createdBy?: string;
    modifiedAt?: Date;
    modifiedBy?: string;
    deleted: boolean = false;
  
    constructor(init?: Partial<User>) {
      Object.assign(this, init);
    }
  }
  