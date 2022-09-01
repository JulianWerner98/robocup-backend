import {Body, Controller, Delete, Get, Param, Patch, Post} from "@nestjs/common";
import {MemberService} from "./member.service";
import {Member} from "./member.schema";
import {CreateMemberDto, UpdateTravelDto} from "./dto";
import {FindMemberParamDto} from "./dto/find-member-param.dto";

@Controller({
    version: '1',
    path: 'member'
})
export class MemberControllerV1 {
    constructor(private memberService: MemberService) {
    }

    @Post()
    async createMember(
        @Body() createMemberDto: CreateMemberDto): Promise<Member> {
        return this.memberService.create(createMemberDto);
    }

    @Get()
    async getMembers(): Promise<Member[]> {
        return this.memberService.findAll();
    }

    @Get(':id')
    async getMember(@Param() params: FindMemberParamDto): Promise<Member> {
        return this.memberService.findOne(params.id);
    }

    @Patch(':id')
    async updateMember(
        @Param() params: FindMemberParamDto,
        @Body() updateTravelDto: UpdateTravelDto): Promise<Member> {
        return this.memberService.updateOne(params.id, updateTravelDto);
    }

    @Delete(':id')
    async deleteMember(@Param() params: FindMemberParamDto): Promise<Member> {
        return this.memberService.delteOne(params.id);
    }
}