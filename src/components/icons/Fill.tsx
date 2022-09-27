import usePixelArtboardColor from '../../pixel/hooks/usePixelArtboardColor';

export default function Fill() {
    const color = usePixelArtboardColor();
    return (
        <svg
            viewBox='0 0 1024 1024'
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
        >
            <path
                d='M96 768h832v160H96z'
                fill={color}
                data-spm-anchor-id='a313x.7781069.0.i0'
            ></path>
            <path
                d='M398.176 225.088L318.976 145.92 364.224 100.64l118.304 118.272c2.272 1.76 4.48 3.68 6.592 5.76l181.024 181.024a64 64 0 0 1 0 90.496l-181.024 181.024a64 64 0 0 1-90.528 0L217.6 496.192a64 64 0 0 1 0-90.496l180.576-180.608z m170.144 169.28l-0.448 0.416-124.416-124.416-175.136 175.104h351.104L568.32 394.368zM752 704a80 80 0 0 1-80-80c0-44.16 67.68-124.672 80-124.672 12.32 0 80 80.48 80 124.672a80 80 0 0 1-80 80z'
                fill={color}
            ></path>
        </svg>
    );
}

Fill.displayName = 'fill';
