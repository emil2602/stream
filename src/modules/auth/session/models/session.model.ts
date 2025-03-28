import {Field, ID, ObjectType} from "@nestjs/graphql";
import {DeviceInfo, LocationMetadata, SessionMetadata} from "@/src/shared/types/session-metadata";

@ObjectType()
export class LocationModel implements LocationMetadata {
    @Field(() => String)
    country: string

    @Field(() => String)
    city: string

    @Field(() => Number)
    lat: number

    @Field(() => Number)
    lng: number
}

@ObjectType()
export class DeviceModel implements DeviceInfo {
    @Field(() => String)
    browser: string

    @Field(() => String)
    os: string

    @Field(() => String)
    type: string
}


@ObjectType()
export class SessionMetadataModel implements SessionMetadata {
    @Field(() => LocationModel)
    location: LocationMetadata

    @Field(() => DeviceModel)
    device: DeviceInfo

    @Field(() => String)
    ip: string
}

@ObjectType()
export class SessionModel {
    @Field(() => ID)
    id: string

    @Field(() => String)
    userId: string

    @Field(() => String)
    createdAt: string

    @Field(() => SessionMetadataModel)
    metadata: SessionMetadataModel
}